export type ModelResponse = {
  response_data: {
    respose: string;
    file_name: string;
    file_path: string;
    questions_this_excerpt_can_answer: string;
  };
  memory_data: {
    chat_store_string: string;
    chat_store_key: string;
  };
};
