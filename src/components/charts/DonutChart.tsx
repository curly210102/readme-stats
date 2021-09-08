import SVGRender from "../../helpers/SVGRender";
import { clampValue } from "../../utils/render";

interface Props {
  data: Array<{
    color: string;
    label?: string;
    percent: number;
  }>;
  radius?: number;
  barWidth?: number;
}
const DonutChart: SVGRender.FunctionComponent<Props> = (
  { data, radius = 40, barWidth = 6 }: Props,
  children
) => {
  let totalPercent = 0;
  return (
    <g transform={`translate(${radius / 2}, ${radius / 2})`}>
      <circle
        class="primary-stroke"
        cx="0"
        cy="0"
        r={radius}
        style={{
          fill: "none",
          "stroke-width": barWidth,
          opacity: 0.2,
        }}
      />
      {data.map(({ color, percent }, index) => {
        const perimeter = Math.PI * (radius * 2);
        const prevPercent = totalPercent;
        totalPercent += percent;
        return (
          <circle
            cx="0"
            cy="0"
            r={radius}
            style={{
              "stroke-dasharray": perimeter,
              fill: "none",
              "stroke-width": barWidth,
              "stroke-linecap": data.length > 1 ? "unset" : "round",
              transform: `rotate(${-90 + (prevPercent / 100) * 360}deg)`,
              animation: `rankAnimation${index} 0.2s forwards ease-in-out ${
                index * 0.1 + 0.2
              }s`,
              stroke: color,
              opacity: 0,
            }}
            css={getProgressAnimation(0, percent, perimeter, index)}
          />
        );
      })}

      <g
        class="text-fill"
        style={{
          animation: "scaleInAnimation 1s ease-in-out forwards",
        }}
        text-anchor="middle"
      >
        {children}
      </g>
    </g>
  );
};

const getProgressAnimation = (
  start: number,
  end: number,
  c: number,
  animationId: number
) => {
  return `
    @keyframes rankAnimation${animationId} {
      from {
        stroke-dashoffset: ${((100 - clampValue(start, 0, 100)) / 100) * c};
        opacity: 1;
      }
      to {
        stroke-dashoffset: ${((100 - clampValue(end, 0, 100)) / 100) * c};
        opacity: 1;
      }
    }
    @keyframes scaleInAnimation {
      from {
        transform: scale(0);
      }
      30% {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  `;
};

export default DonutChart;
