import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";

interface Review {
  name: string;
  email: string;
  rating: number;
  message: string;
}

interface ReviewProps extends IRowTheme {
  review: Review;
}

const ReviewCard = ({ review, ...other }: ReviewProps) => {
  return (
    <Card
      className="text-black grid grid-rows-[auto_1fr] gap-2"
      theme={other.theme}
    >
      <img
        src={`./assets/avatars/avatar_0${Math.floor(
          Math.random() * (4 - 1) + 1
        )}.svg`}
        alt=""
        className="h-16 mx-auto"
      />
      <div className="grid grid-rows-[auto_auto_auto] gap-0.5">
        <h2 className="text-lg font-semibold">{review.name}</h2>
        <div className="flex text-2xl justify-center">
          <span className="text-orange-700">{"★".repeat(review.rating)}</span>
          <span className="text-black">{"★".repeat(5 - review.rating)}</span>
        </div>
        <p className="text-black">{review.message}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
