import { VercelRequestQuery } from "@vercel/node";
import Card, { CommonProps } from "../index";
import translation from "./translation";
import SVGRender from "../../helpers/SVGRender";
import CardContainer from "../../components/CardContainer";
import { getCardColors } from "../../utils/render";

export type Props = CommonProps;

interface FetchStats {
  /** describe fetchStats return data */
  example?: string;
}

export default class NewCard extends Card<Props, FetchStats> {
  constructor(props: VercelRequestQuery) {
    super(props, translation);
  }
  protected preprocess(props: VercelRequestQuery): Props {
    const commonProps = super.preprocess(props);

    /** initialize exclusive props */

    return {
      ...commonProps,
    };
  }
  protected checkProps(): void {
    super.checkProps();
    /** check exclusive props */
  }

  protected async fetchStats(): Promise<FetchStats> {
    /** request data */
    return await Promise.resolve({});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected renderCard(stats: FetchStats): SVGRender.SVGElement {
    /**
     * render svg, support jsx
     * you can find exist components in src/components
     */
    const colors = getCardColors(this.props);
    return <CardContainer colors={colors}></CardContainer>;
  }
}
