import SVGRender from "../../helpers/SVGRender";
import FlexLayout from "../FlexLayout";

interface Props {
  data: Array<{
    color: string;
    label?: string;
    percent: number;
    remark?: string;
    labelStyle?: SVGRender.SVGAttributes<SVGTSpanElement>;
    remarkStyle?: SVGRender.SVGAttributes<SVGTSpanElement>;
  }>;
  height: number;
  width: number;
  layout: "row" | "branch";
  round?: boolean;
  barWidth?: number;
}
const BarChart: SVGRender.FunctionComponent<Props> = ({
  data,
  round = true,
  height,
  width,
  barWidth = 6,
  layout,
}: Props) => {
  const renderBar = ({ color, percent }: Props["data"][0], top = 0) => {
    return (
      <g transform={`translate(0, ${barWidth / 2 + top})`}>
        <line
          class="primary-stroke"
          x1={barWidth / 2}
          y1="0"
          x2={`calc(100% - ${barWidth / 2}px)`}
          y2="0"
          stroke-width={barWidth}
          stroke-linecap={round ? "round" : "unset"}
          fill="none"
          style={{
            opacity: 0.2,
          }}
        />
        <line
          style={{
            stroke: color,
            animation: "progressAnimation 3s ease 0.5s both",
          }}
          x1={barWidth / 2}
          y1="0"
          x2={`calc(${percent}% - ${barWidth / 2}px)`}
          y2="0"
          stroke-width={barWidth}
          stroke-linecap={round ? "round" : "unset"}
          stroke-dasharray="100%"
          fill="none"
        />
      </g>
    );
  };
  return (
    <svg
      width={width}
      height={height}
      css={`
        @keyframes progressAnimation {
          from {
            stroke-dashoffset: 100%;
          }
          to {
            stroke-dashoffset: 0%;
          }
        }
      `}
      style={{
        overflow: "visible",
      }}
    >
      <FlexLayout
        items={data.map((item) => {
          const { label, remark, labelStyle, remarkStyle } = item;
          if (layout === "branch") {
            return (
              <>
                <text class="primary-fill">
                  {label ? <tspan style={labelStyle}>{label}</tspan> : null}
                  {remark ? (
                    <tspan text-anchor="end" x="100%" style={remarkStyle}>
                      {remark}
                    </tspan>
                  ) : null}
                </text>
                {renderBar(item, 10)}
              </>
            );
          }
        })}
        direction="column"
        gap={height / data.length}
      ></FlexLayout>
    </svg>
  );
};

export default BarChart;
