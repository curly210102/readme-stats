const $$symbol = Symbol("SVGElement");

const Fragment = Symbol("SVGRender.Fragment");

export function createElement<P extends SVGRender.SVGAttributes>(
  type: keyof JSX.IntrinsicElements,
  props?: P | null,
  ...children: SVGRender.ComponentChildren
): SVGRender.SVGElement;

export function createElement<T>(
  type: SVGRender.FunctionComponent,
  props?: T | null,
  ...children: SVGRender.ComponentChildren
): SVGRender.SVGElement;

export function createElement<P extends Record<string, unknown>>(
  type:
    | keyof JSX.IntrinsicElements
    | SVGRender.FunctionComponent
    | typeof Fragment,
  props?: P,
  ...children: SVGRender.ComponentChildren
): SVGRender.SVGElement {
  const svgElement: SVGRender.SVGElement = {
    content: "",
    css: [],
    $$symbol,
  };

  // SVGRender.Fragment
  if (type === Fragment) {
    const cssDeclaration: string[] = [];
    const contentList: string[] = [];
    children.forEach((child) => {
      const childArray = Array.isArray(child) ? child : [child];
      childArray.forEach((child) => {
        if (typeof child === "number") {
          contentList.push(`${child}`);
        } else if (typeof child === "string") {
          contentList.push(child);
        } else if (isValidElement(child)) {
          cssDeclaration.push(...child.css);
          contentList.push(child.content);
        }
      });
    });
    svgElement.css = cssDeclaration;
    svgElement.content = `${contentList.join("")}`;
    return svgElement;
  }

  // JSX.IntrinsicElements
  if (typeof type === "string") {
    const attributes = [""];
    const cssDeclaration: string[] = [];
    const contentList: string[] = [];
    // props
    if (props) {
      Object.entries(props).forEach(([name, value]) => {
        if (name === "data-testid" && process.env.NODE_ENV !== "test") {
          return;
        }
        let stringifyValue = value;
        if (typeof value === "object" && value && !Array.isArray(value)) {
          stringifyValue = Object.entries(value)
            .map(([name, value]) => `${name}:${value}`)
            .join(";");
        }
        if (name === "css") {
          cssDeclaration.push(value as string);
        } else if (stringifyValue) {
          attributes.push(`${name}="${stringifyValue}"`);
        }
      });
    }
    // children
    children.forEach((child) => {
      const childArray = Array.isArray(child) ? child : [child];
      childArray.forEach((child) => {
        if (typeof child === "number") {
          contentList.push(`${child}`);
        } else if (typeof child === "string") {
          contentList.push(child);
        } else if (isValidElement(child)) {
          cssDeclaration.push(...child.css);
          contentList.push(child.content);
        }
      });
    });

    if (type === "svg") {
      const cssTextContent = cssDeclaration.join("\n");
      svgElement.css = [];
      svgElement.content = `<${type}${attributes.join(" ")}><style>${
        process.env.NODE_ENV === "test"
          ? cssTextContent.replace(/(@keyframes\b[^[*#@]+})/g, "")
          : cssTextContent
      }</style>${contentList.join("")}</${type}>`;
    } else {
      svgElement.css = cssDeclaration;
      svgElement.content = `<${type}${attributes.join(" ")}>${contentList.join(
        ""
      )}</${type}>`;
    }

    return svgElement;
  }
  // SVGRender.FunctionComponent
  if (typeof type === "function") {
    const functionElement = type(props ?? {}, children);
    if (Array.isArray(functionElement)) {
      const css: string[] = [];
      const content: string[] = [];
      functionElement.forEach((element) => {
        css.push(...element.css);
        content.push(element.content);
      });
      svgElement.css = css;
      svgElement.content = content.join("");
    } else if (isValidElement(functionElement)) {
      svgElement.css = functionElement.css;
      svgElement.content = functionElement.content;
    }
  }

  return svgElement;
}

export function isValidElement(
  element: unknown
): element is SVGRender.SVGElement {
  return typeof element === "object" && element
    ? (element as SVGRender.SVGElement).$$symbol === $$symbol
    : false;
}

export function render(element: SVGRender.SVGElement | string): string {
  if (isValidElement(element)) return element.content;
  else return element;
}

export default {
  createElement,
  render,
  isValidElement,
  Fragment,
};
