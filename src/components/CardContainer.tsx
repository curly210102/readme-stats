import SVGRender from "../helpers/SVGRender";
import { encodeHTML } from "../utils/string";

export interface CardColors {
  titleColor: string;
  textColor: string;
  iconColor: string;
  bgColor: string | string[];
  borderColor: string;
}

const getGlobalStyles = (colors: CardColors) => {
  const { titleColor, textColor, iconColor } = colors;
  return `
      svg {
        font-family: 'Segoe UI', Ubuntu, Sans-Serif;
        font-weight: 400;
        font-size: 14px;
      }
      .font-sans {font-family: 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;}
      .font-medium {font-weight: 500}
      .font-semibold { font-weight: 600 }
      .font-bold { font-weight: 700 }
      .font-extrabold {font-weight: 800}
      .fadeIn {
        opacity: 0;
        animation: fadeInAnimation 0.3s ease-in-out forwards;
      }
      .text-2xl {
        font-size: 24px;
      }
      .text-xl {
        font-size: 18px;
      }
      .text-lg {
        font-size: 16px;
      }
      .text-base {
        font-size: 14px;
      }
      .text-sm {
        font-size: 12px;
      }
      .text-xs {
        font-size: 11px;
      }
  
      .icon {
        fill: ${iconColor};
      }
      .primary-stroke {
        stroke: ${titleColor}
      }
      .primary-fill {
        fill: ${titleColor}
      }
      .text-primary {
        color: ${titleColor}
      }
      .text-secondary {
        color: #858585
      }
      .text-fill {
        fill: ${textColor}
      }
      .text-stroke {
        stroke: ${textColor}
      }
      .fill-secondary {
        fill: #858585;
      }
      .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        display: block;
      }

    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }`;
};

function Gradient({ colors }: { colors: CardColors }) {
  const { bgColor } = colors;
  if (typeof bgColor !== "object") return "";

  const gradients = bgColor.slice(1);
  return typeof bgColor === "object" ? (
    <defs>
      <linearGradient id="gradient" gradientTransform={`rotate(${bgColor[0]})`}>
        {gradients.map((grad, index) => {
          const offset = (index * 100) / (gradients.length - 1);
          return <stop offset={`${offset}%`} stop-color={`#${grad}`} />;
        })}
      </linearGradient>
    </defs>
  ) : null;
}

function Title({
  title,
  icon,
  paddingX,
  paddingY,
  width,
}: {
  title: string;
  icon?: string | null;
  paddingX: number;
  paddingY: number;
  width: number;
}) {
  const prefixIcon = icon ? (
    <svg
      class="icon"
      x="0"
      viewBox="0 0 30 30"
      version="1.1"
      width="20"
      height="20"
      y="-18"
    >
      {icon}
    </svg>
  ) : null;

  return (
    <g
      transform={`translate(${paddingX}, ${paddingY + 18})`}
      style={{
        animation: "fadeInAnimation 0.8s ease-in-out forwards",
        overflow: "hidden",
      }}
      width={width}
    >
      {prefixIcon}
      <text x={prefixIcon ? 26 : 0} class="primary-fill font-semibold text-xl">
        {title}
      </text>
    </g>
  );
}

interface Props {
  width?: number;
  height?: number;
  colors?: CardColors;
  borderRadius?: number;
  hideBorder?: boolean;
  hideTitle?: boolean;
  isDisableAnimation?: boolean;
  titlePrefixIcon?: string | null;
  customTitle?: string;
  defaultTitle?: string;
  paddingX?: number;
  paddingY?: number;
}

const CardContainer: SVGRender.FunctionComponent<
  Props,
  SVGRender.ComponentChildren
> = (
  {
    width = 495,
    height = 195,
    borderRadius = 4.5,
    colors = {
      titleColor: "",
      textColor: "",
      iconColor: "",
      bgColor: "",
      borderColor: "",
    },
    hideBorder,
    hideTitle,
    isDisableAnimation = false,
    titlePrefixIcon,
    customTitle,
    defaultTitle = "",
    paddingX = 25,
    paddingY = 18,
  }: Props,
  children
) => {
  const { borderColor, bgColor } = colors;

  const Header = hideTitle ? null : (
    <Title
      title={encodeHTML(customTitle ?? defaultTitle)}
      icon={titlePrefixIcon}
      paddingX={paddingX}
      paddingY={paddingY}
      width={width - paddingX * 2}
    />
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={`
        ${getGlobalStyles(colors)}
        ${isDisableAnimation === true
          ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
          : ""}
      `}
    >
      <Gradient colors={colors} />
      <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        rx={borderRadius}
        height="99%"
        stroke={borderColor}
        width={width - 1}
        fill={typeof bgColor === "object" ? "url(#gradient)" : bgColor}
        stroke-opacity={hideBorder ? 0 : 1}
      />

      {Header}
      <svg
        x={paddingX}
        y={Header ? 50 : paddingY}
        style={{ overflow: "visible" }}
      >
        {children.map((child) =>
          typeof child === "function"
            ? child({
                width,
                height,
                innerHeight: height - (Header ? 50 : paddingY) - paddingY,
                innerWidth: width - paddingX * 2,
                paddingY,
                paddingX,
              })
            : child
        )}
      </svg>
    </svg>
  );
};

export default CardContainer;

export type RenderChildrenArguments = {
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  paddingY: number;
  paddingX: number;
};
