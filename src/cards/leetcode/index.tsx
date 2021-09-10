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
import icons from "../../icons";
import OfficialLayout from "./Layout/official";
import ProgressLayout from "./Layout/progress";

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
  layout: string;
}

export type FetchStats = Array<{
  difficulty: string;
  ac: number;
  count: number;
  acSubmissions: number;
  submissions: number;
}>;

export default class LeetCodeCard extends Card<Props, FetchStats> {
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
      layout,
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
      layout: toString(layout) ?? "official",
    };
  }
  protected checkProps(): void {
    super.checkProps();
    /** check exclusive props */

    const { region } = this.props;

    if (!["en", "cn"].includes(region)) {
      throw new URLQueryError(URLQueryError.TYPE.INVALID, "region");
    }
  }

  protected async fetchStats(): Promise<FetchStats> {
    /** request data */
    const { region, username } = this.props;
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
      width: customWidth,
      height: customHeight,
      hide_icon,
      layout,
    } = this.props;

    const total = stats.reduce(
      (acc, cur) => {
        acc.ac += cur.ac;
        acc.count += cur.count;
        acc.acSubmissions += cur.acSubmissions;
        acc.submissions += cur.submissions;
        return acc;
      },
      {
        difficulty: "total",
        ac: 0,
        count: 0,
        acSubmissions: 0,
        submissions: 0,
      }
    );

    return (
      <CardContainer
        colors={getCardColors(this.props)}
        width={customWidth}
        height={customHeight}
        defaultTitle={this.i18n.t("title")}
        customTitle={custom_title}
        hideTitle={hide_title}
        titlePrefixIcon={hide_icon ? null : icons.leetcode}
      >
        {(card: RenderChildrenArguments) => {
          const Layout =
            layout === "progress" ? ProgressLayout : OfficialLayout;
          return (
            <Layout
              props={this.props}
              stats={stats}
              card={card}
              i18n={this.i18n}
              total={total}
            />
          );
        }}
      </CardContainer>
    );
  }
}
