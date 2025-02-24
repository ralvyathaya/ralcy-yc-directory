import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import ViewIncrementer from "./ViewIncrementer";

// Server component that displays views
export default async function View({ id }: { id: string }) {
  try {
    const { views: totalViews } = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUPS_VIEWS_QUERY, { id });

    return (
      <div className="view-container">
        <ViewIncrementer id={id} />
        <div className="absolute -top-2 -right-2">
          <Ping />
        </div>
        <p className="view-text">
          <span className="font-black">Views: {totalViews}</span>
        </p>
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch views for id ${id}:`, error);
    return (
      <div className="view-container">
        <p className="view-text">Views: N/A</p>
      </div>
    );
  }
}