"use client";
import React from "react";
import { Api } from "../../../shared/services/api-client";
import { CartStory } from "../../../shared/services/stories";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { useWindowSize } from "react-use";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<CartStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<CartStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const onClickStory = (story: CartStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          "flex items-center gap-2 my-10 overflow-x-auto md:overflow-x-hidden",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[160px] h-[250px] md:w-[200px] md:h-[250px] bg-gray-200 rounded-md animate-pulse flex-shrink-0"
            />
          ))}
        {stories.map((story) => (
          <img
            src={story.previewImageUrl}
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer flex-shrink-0 object-cover w-[160px] h-[250px] md:w-[200px] md:h-[250px]"
          />
        ))}

        {open && (
          <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-full max-w-[520px]">
              <button
                className="absolute right-0 top-0 m-3 z-[1000] md:-right-10 md:-top-5 md:m-0"
                onClick={() => setOpen(false)}
              >
                <X className="w-8 h-8 text-white cursor-pointer" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width="100%"
                height={windowWidth > 520 ? Math.min(windowHeight * 0.9, 800) : windowHeight}

              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
