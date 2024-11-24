import type { Meta, StoryObj } from '@storybook/react'

import ResultsViewer from './index'

const meta: Meta<typeof ResultsViewer> = {
  title: 'Components/ResultsViewer',
  component: ResultsViewer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ResultsViewer>

const mockSimpleData = {
  results: {
    main: {
      participants: ['John', 'Jane'],
      duration: 30.0,
      status: 'completed'
    }
  },
  titles: {
    main: {
      data: {
        participants: 'Meeting Participants',
        duration: 'Meeting Duration',
        status: 'Meeting Status'
      }
    }
  }
}

export const Simple: Story = {
  args: {
    data: mockSimpleData
  }
}

// Using the actual engine response data
export const WithEngineData: Story = {
  args: {
    data: {
      results: {
        main: {
          participants: ["Alex", "Sarah"],
          duration: 15.0,
          question_answers: {
            q_and_a: [
              {
                who_asked: "Alex",
                question: "In your experience, how do you approach evaluating machine learning models, especially when comparing classical machine learning techniques to large language models (LLMs)?",
                who_answered: "Sarah",
                answer: "When evaluating machine learning models, it's important to understand the use case. For classical models, metrics like accuracy, precision, recall, and F1 score are commonly used.  For LLMs, evaluation is more nuanced. Metrics like BLEU, ROUGE, or METEOR are used for text generation, but human evaluation is crucial for assessing usefulness and relevance."
              },
              {
                who_asked: "Alex",
                question: "You touched on human evaluation there. Could you elaborate on how you would design or oversee an effective human evaluation process for an LLM?",
                who_answered: "Sarah",
                answer: "Human evaluation is crucial for LLMs, especially for subjective tasks.  The key is to have clear guidelines for evaluators, specifying what they should look for (relevance, accuracy, fluency, ethical considerations). Inter-annotator agreement is important to reduce bias, potentially using Cohen's kappa or Krippendorff's alpha.  Balancing subjective judgment with objective measures is also important, using automated metrics for speed and scale while relying on human evaluation for deeper insights."
              },
            ]
          },
          "interview-meeting": {
            sentiments: "Neutral\n",
            "likely-hood-of-accepting": 4.0,
            summary: {
              pros: "Sarah demonstrates a good foundational understanding of machine learning model evaluation, covering both classical techniques and LLMs. She recognizes the importance of different metrics for various tasks and understands the nuances of evaluating unstructured text.  She also highlights the significance of human evaluation and considers factors like inter-annotator agreement. Her emphasis on interpretability and ethical considerations, particularly in sensitive domains like healthcare, is commendable.  She provides practical examples from her past experience, demonstrating a connection between theory and practice.",
              cons: "Sarah's responses are hesitant and filled with filler words like \"uh\" and \"um,\" suggesting a lack of confidence or preparedness.  While she touches upon important concepts, her explanations often lack depth and specific details.  She frequently admits to limited practical experience with LLMs and their deployment, relying heavily on theoretical knowledge gained through reading.  Although she identifies relevant evaluation strategies, she doesn't articulate how she would implement them in practice. This raises concerns about her readiness to handle complex real-world challenges.",
              should_we_hire: "Maybe",
              attendees: ["Alex", "Sarah"],
              topics: [
                "Machine learning model evaluation",
                "Classical machine learning techniques",
                "Large language models (LLMs)",
                "Human evaluation",
                "Inter-annotator agreement",
                "Model comparison (simpler vs. complex)",
                "Computational cost vs. performance",
                "Model deployment",
                "Evaluation framework for healthcare",
                "Ethical considerations in AI"
              ]
            }
          }
        }
      },
      titles: {
        main: {
          workflow: "Entry Point",
          data: {
            participants: "Meeting Participants",
            duration: "Meeting Duration",
            question_answers: "Question and Answers"
          },
          "interview-meeting": {
            workflow: "Interview Meeting",
            data: {
              sentiments: "Meeting Sentiment",
              "likely-hood-of-accepting": "Acceptance Probability",
              summary: "Interview Summary"
            }
          }
        }
      }
    }
  }
}
