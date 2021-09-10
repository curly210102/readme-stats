import SVGRender from "../../../helpers/SVGRender";
import FlexLayout from "../../../components/FlexLayout";
import DonutChart from "../../../components/charts/DonutChart";
import { Props as CardProps, FetchStats as Stats } from "../index";
import { RenderChildrenArguments } from "../../../components/CardContainer";
import I18n from "../../../helpers/I18n";

interface Props {
  props: CardProps;
  stats: Stats;
  card: RenderChildrenArguments;
  i18n: I18n;
  total: Stats["0"];
}

const OfficialLayout: SVGRender.FunctionComponent<Props> = ({
  props,
  stats,
  card,
  i18n,
  total,
}) => {
  const { hide_progress } = props;
  const { width, paddingX, paddingY, innerHeight } = card;
  const radius = 46;
  const difficultyColors = {
    easy: "#2DB55D",
    medium: "#FFB800",
    hard: "#EF4743",
  };
  const submissionRate = (total.acSubmissions / total.submissions) * 100;
  return (
    <>
      {hide_progress ? null : (
        <g
          transform={`translate(${width - paddingX - radius * 2}, ${paddingY})`}
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
            <text class="text-xl font-semibold" x="0" y="-8">
              <tspan dx="0">{submissionRate.toFixed(1).split(".")[0]}</tspan>
              <tspan class="text-sm" dy="0.1em">
                .{submissionRate.toFixed(1).split(".")[1]}%
              </tspan>
            </text>
            <text class="text-sm fill-secondary" x="0" y="10">
              {i18n.t("submitText")}
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
          <tspan class="fill-secondary text-sm">{i18n.t("solved")}</tspan>
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
                  {i18n.t(difficulty.toLowerCase())}
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
export default OfficialLayout;
