import { FC, useCallback } from "react";
import { TopicType } from "../../types";
import { getUserData, markTopicAsComplete } from "../../services/api";
import { useUser } from "../../contexts/UserContext";

const Topic: FC<TopicType> = ({ _id, title, subtopics }) => {
  const { user, updateUser, setIsLoading } = useUser();

  const handleToggle = useCallback(
    async (topicId: string, subtopicId: number, isComplete: boolean) => {
      try {
        setIsLoading(true);
        await markTopicAsComplete({ topicId, subtopicId, isComplete });
        setTimeout(async () => {
          const userData = await getUserData();
          updateUser(userData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error", error);
      }
    },
    [setIsLoading, updateUser]
  );

  return (
    <div
      key={_id}
      className="bg-white backdrop-blur-lg bg-opacity-60 w-full rounded-lg py-10 px-8 text-[#3A3A3A]"
    >
      <h2 className="text-3xl mb-4 font-bold text-black">{title}</h2>
      <ul className="flex flex-col gap-y-8">
        {subtopics.map((subtopic) => {
          const topicCompletion = user?.completedTopics.find(
            (completed) => completed.topicId === _id
          );

          const isChecked =
            topicCompletion?.subtopicIds.includes(subtopic.id) ?? false;

          return (
            <li
              key={subtopic.id}
              className="flex gap-2 flex-col items-start justify-start w-full gap-y-3 border border-black p-4 rounded-lg"
            >
              <div className="flex items-center justify-center gap-x-2">
                {user && (
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleToggle(_id, subtopic.id, e.target.checked)
                    }
                    className="cursor-pointer"
                    title={!isChecked ? "Mark Complete" : "Mark Incomplete"}
                    aria-label={
                      !isChecked ? "Mark Complete" : "Mark Incomplete"
                    }
                  />
                )}

                <span className="text-xl">{subtopic.title}</span>
                <span className="text-lg font-bold">
                  ({subtopic.difficulty})
                </span>
              </div>
              <iframe
                className="w-[17rem] h-[10rem] md:w-[35rem] md:h-[19.688rem]"
                src={subtopic.youtubeLink}
                title={subtopic.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
              <a
                className="text-lg cursor-pointer font-bold hover:underline hover:text-brandpurple"
                href={subtopic.leetcodeLink}
                target="_blank"
              >
                Practice on Leet Code
              </a>
              <a
                className="text-lg cursor-pointer font-bold hover:underline hover:text-brandpurple"
                href={subtopic.articleLink}
                target="_blank"
              >
                Read More
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Topic;
