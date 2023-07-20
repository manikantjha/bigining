import { objHowItStartedInfo } from "@/data/data";
import { IRowTheme } from "@/types/row";
import story from "../../public/assets/story.jpg";
import RowWrapper from "../common/RowWrapper";
import Row from "../common/row/Row";

interface IStoryRow extends IRowTheme {}

export default function StoryRow(props: IStoryRow) {
  return (
    <RowWrapper theme={props.theme}>
      <Row
        imgSrc={story}
        renderRightColumn={() => (
          <div>
            <h2 className="text-4xl mb-8 font-display uppercase">Our Story</h2>
            <div className="max-w-4xl mx-auto text-base text-black">
              {objHowItStartedInfo.description}
            </div>
          </div>
        )}
      />
    </RowWrapper>
  );
}
