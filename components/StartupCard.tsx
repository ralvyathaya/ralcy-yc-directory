import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

// Component for displaying a startup card
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, title, category, _id, image, description } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      {/* Revised layout: text on left and profile image on right */}
      <div className="flex items-center mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <div className="flex-shrink-0">
          <Link href={`/user/${author?._id}`}>
            <Image 
              src="https://placehold.co/48x48" 
              alt="Placeholder" 
              width={48} 
              height={48} 
              className="rounded-full" 
            />
          </Link>
        </div>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">
          {description}
        </p>

        <Image 
          src={image || "https://placehold.co/600x400"} 
          alt="placeholder" 
          className="startup-card_img" 
          width={600} 
          height={400} 
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`query=${category?.toLowerCase}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
