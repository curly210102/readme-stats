import SVGRender from "../../../helpers/SVGRender";
import DonutChart from "../../../components/charts/DonutChart";
import { Props as CardProps, FetchStats as Stats } from "../index";
import { RenderChildrenArguments } from "../../../components/CardContainer";
import I18n from "../../../helpers/I18n";
import BarChart from "../../../components/charts/BarChart";

interface Props {
  props: CardProps;
  stats: Stats;
  card: RenderChildrenArguments;
  i18n: I18n;
}

const ProgressLayout: SVGRender.FunctionComponent<Props> = ({
  props,
  stats,
  card,
  i18n,
}) => {
  const { hide_progress, hide_title } = props;
  const { innerWidth, paddingX, paddingY, innerHeight } = card;
  const radius = 46;
  const difficultyColors = {
    easy: "#2DB55D",
    medium: "#FFB800",
    hard: "#EF4743",
  };
  const total = stats.pop()!;
  const submissionRate = (total.acSubmissions / total.submissions) * 100;
  return (
    <>
      {hide_progress ? null : (
        <g
          transform={`translate(${paddingX}, ${
            innerHeight / 2 - radius + paddingY
          })`}
          class="fadeIn"
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
            <text class="font-extrabold" style={{ "font-size": "28px" }}>
              {total.ac}
            </text>
          </DonutChart>
        </g>
      )}

      <g
        transform={`translate(${radius * 2 + paddingX}, ${paddingY})`}
        class="fadeIn"
        style={{
          "animation-delay": "0.3s",
        }}
      >
        <BarChart
          data={stats.map(({ difficulty, ac, count }) => {
            const color =
              difficultyColors[
                difficulty.toLowerCase() as keyof typeof difficultyColors
              ];
            return {
              color,
              percent: (ac / count) * 100,
              label: i18n.t(difficulty),
              remark: `${ac} / ${count}`,
              labelStyle: {
                fill: color,
              },
              remarkStyle: {
                fill: `var(--secondary-color)`,
              },
            };
          })}
          height={innerHeight}
          width={innerWidth - radius * 2 - paddingX}
          layout="branch"
        ></BarChart>
      </g>
      <g
        transform={`translate(${innerWidth}, ${
          (hide_title ? innerHeight : -paddingY) - 6
        })`}
        text-anchor="end"
        class="fadeIn"
        style={{
          "animation-delay": "0.8s",
        }}
      >
        <text class="text-sm font-semibold fill-secondary" x="0">
          <tspan x="0" y="10">
            {i18n.t("submitText")}
          </tspan>
          <tspan dx="10" class="text-xl">
            {submissionRate.toFixed(1) + "%"}
          </tspan>
        </text>
      </g>
    </>
  );
};
export default ProgressLayout;
