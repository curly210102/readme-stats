import { VercelRequestQuery } from "@vercel/node";
import Card, { CommonProps } from "../index";
import translation from "./translation";
import SVGRender from "../../helpers/SVGRender";
import CardContainer, {
  RenderChildrenArguments,
} from "../../components/CardContainer";
import { getCardColors } from "../../utils/render";
import {
  toBoolean,
  toFloatingNumber,
  toString,
} from "../../utils/vercelRequestQuery";
import { URLQueryError } from "../../helpers/Error";
import { ChineseFetcher, EnglishFetcher } from "./fetcher";
import FlexLayout from "../../components/FlexLayout";
import DonutChart from "../../components/charts/DonutChart";
import icons from "../../icons";

export interface Props extends CommonProps {
  /** add props */
  line_height?: number;
  disable_animations: boolean;
  region: string;
  custom_title?: string;
  hide_title?: boolean;
  hide_progress?: boolean;
  width?: number;
  height?: number;
  hide_icon: boolean;
}

type FetchStats = Array<{
  difficulty: string;
  ac: number;
  count: number;
  acSubmissions: number;
  submissions: number;
}>;

export default class LeetCodeCard extends Card {
  constructor(props: VercelRequestQuery) {
    super(props, translation);
  }
  protected preprocess(query: VercelRequestQuery): Props {
    const commonProps = super.preprocess(query);

    const {
      line_height,
      disable_animations,
      region,
      custom_title,
      hide_title,
      hide_progress,
      width,
      height,
      hide_icon,
    } = query;

    /** initialize exclusive props */
    return {
      ...commonProps,
      line_height: toFloatingNumber(line_height),
      disable_animations: toBoolean(disable_animations) ?? false,
      region: toString(region) ?? "en",
      custom_title: toString(custom_title),
      hide_title: toBoolean(hide_title) ?? false,
      hide_progress: toBoolean(hide_progress) ?? false,
      width: toFloatingNumber(width),
      height: toFloatingNumber(height),
      hide_icon: toBoolean(hide_icon) ?? false,
    };
  }
  protected checkProps() {
    super.checkProps();
    /** check exclusive props */

    const { region } = this.props as Props;

    if (!["en", "cn"].includes(region)) {
      throw new URLQueryError(URLQueryError.TYPE.INVALID, "region");
    }
  }

  protected async fetchStats(): Promise<FetchStats> {
    /** request data */
    const { region, username } = this.props as Props;
    const fetcher =
      region === "cn"
        ? new ChineseFetcher(username)
        : new EnglishFetcher(username);
    return await fetcher.fetchQuestionStats();
  }

  protected renderCard(stats: FetchStats): SVGRender.SVGElement {
    /**
     * render svg, support jsx
     * you can find exist components in src/components
     */
    const {
      custom_title,
      hide_title,
      hide_progress,
      width: customWidth,
      height: customHeight,
      hide_icon,
    } = this.props as Props;

    const difficultyColors = {
      easy: "#2DB55D",
      medium: "#FFB800",
      hard: "#EF4743",
    };

    const total = stats.reduce(
      (acc, cur) => {
        acc.ac += cur.ac;
        acc.count += cur.count;
        acc.acSubmissions += cur.acSubmissions;
        acc.submissions += cur.submissions;
        return acc;
      },
      {
        ac: 0,
        count: 0,
        acSubmissions: 0,
        submissions: 0,
      }
    );
    const submissionRate = (total.acSubmissions / total.submissions) * 100;
    const colors = getCardColors({ ...this.props });
    const radius = 46;

    const renderContent = ({
      width,
      innerHeight,
      paddingY,
      paddingX,
    }: RenderChildrenArguments) => {
      return (
        <>
          {hide_progress ? null : (
            <g
              transform={`translate(${
                width - paddingX - radius * 2
              }, ${paddingY})`}
            >
              <DonutChart
                data={stats.map(({ difficulty, ac }) => {
                  return {
                    color:
                      difficultyColors[
                        difficulty.toLowerCase() as keyof typeof difficultyColors
                      ],
                    percent: (ac / total.count) * 100,
                  };
                })}
                radius={radius}
              >
                <text class="text-xl font-semibold" x="0" y="-4">
                  <tspan dx="0">
                    {submissionRate.toFixed(1).split(".")[0]}
                  </tspan>
                  <tspan class="text-sm" dy="-0.1em">
                    .{submissionRate.toFixed(1).split(".")[1]}%
                  </tspan>
                </text>
                <text class="text-sm fill-secondary" x="0" y="12">
                  {this.i18n.t("submitText")}
                </text>
              </DonutChart>
            </g>
          )}
          <g
            class="fadeIn"
            style={{ "animation-delay": "150ms" }}
            transform="translate(0, 8)"
          >
            <text class="font-semibold">
              <tspan class="fill-secondary text-sm">
                {this.i18n.t("solved")}
              </tspan>
              <tspan class="text-fill text-2xl" dy="1.2em" x="0">
                {total.ac}
              </tspan>
            </text>
          </g>

          <g transform={`translate(0, ${innerHeight - 32})`}>
            <FlexLayout
              items={stats.map(({ difficulty, ac, count }, index) => {
                return (
                  <text
                    class="fadeIn font-semibold"
                    style={`animation-delay: ${(index + 2) * 150}ms`}
                  >
                    <tspan
                      fill={
                        difficultyColors[
                          difficulty.toLowerCase() as keyof typeof difficultyColors
                        ]
                      }
                    >
                      {this.i18n.t(difficulty.toLowerCase())}
                    </tspan>
                    <tspan dy="1.4em" x="0" opacity="0.8" class="font-sans">
                      <tspan class="text-fill font-semibold">{ac}</tspan>
                      <tspan class="fill-secondary text-sm font-medium">
                        /{count}
                      </tspan>
                    </tspan>
                  </text>
                );
              })}
              gap={100}
            ></FlexLayout>
          </g>
        </>
      );
    };

    return (
      <CardContainer
        colors={colors}
        width={customWidth}
        height={customHeight}
        defaultTitle={this.i18n.t("title")}
        customTitle={custom_title}
        hideTitle={hide_title}
        titlePrefixIcon={hide_icon ? null : icons.leetcode}
      >
        {renderContent}
      </CardContainer>
    );
  }
}
