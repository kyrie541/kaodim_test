export const data = {
    "title": "About You ",
    "questions": [
        {
            "id": 2447,
            "question_type": "TextQuestion",
            "prompt": "How are you?",
            "is_required": false,
            "min_char_length": 0
        },
      {
          "id": 2448,
          "question_type": "TextQuestion",
          "prompt": "What is your interest?",
          "is_required": true,
          "min_char_length": 100
      },
      {
          "id": 2500,
          "question_type": "TextQuestion",
          "prompt": "What is your favourite movie?",
          "is_required": true,
          "min_char_length": 15
      },
      {
          "id": 2501,
          "question_type": "imageQuestion",
          "prompt": "Can you upload your image please?",
          "is_required": false,
          "min_char_length": 0
      },
      {
          "id": 2502,
          "question_type": "checkboxQuestion",
          "prompt": "What is your favourite fruit?",
          "is_required": true,
          "min_char_length": 1
      },
      {
          "id": 2503,
          "question_type": "radioQuestion",
          "prompt": "What is your gender?",
          "is_required": true,
          "min_char_length": 1
      }
    ]
}