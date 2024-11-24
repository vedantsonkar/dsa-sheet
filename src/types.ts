// User type
export interface UserDataType {
  name: string;
  email: string;
  completedTopics: Array<{
    topicId: string; // The topicId should be a string (ObjectId converted to string when fetched from MongoDB)
    subtopicIds: number[]; // Array of subtopic IDs that the user has completed
  }>;
}

// Subtopic type
export interface SubtopicType {
  id: number;
  title: string;
  youtubeLink?: string;
  leetcodeLink?: string;
  articleLink?: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// Topic type
export interface TopicType {
  _id: string;
  title: string;
  subtopics: SubtopicType[];
}
