import { useEffect, useState } from "react";
import { getTopics } from "../services/api";
import { TopicType } from "../types";
import Topic from "../components/Topic/Topic";
import { useUser } from "../contexts/UserContext";
import Button from "../components/Button/Button";

const HomePage = () => {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const { user, setLoginModalOpen, setSelectedTab } = useUser();

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data);
    };
    fetchTopics();
  }, []);

  return (
    <div className="py-4 flex flex-col w-full gap-y-6 px-4 md:px-6 lg:max-w-7xl mx-auto">
      {!user && (
        <div className="flex flex-col gap-y-2 items-start justify-start">
          <p className="text-2xl">Log In to track your progress!</p>
          <Button
            label="Login / Signup"
            onClick={() => {
              setSelectedTab("Login");
              setLoginModalOpen(true);
            }}
          />
        </div>
      )}
      {topics &&
        topics.length > 0 &&
        topics?.map((topic) => (
          <Topic
            _id={topic._id}
            title={topic.title}
            subtopics={topic.subtopics}
          />
        ))}
    </div>
  );
};

export default HomePage;
