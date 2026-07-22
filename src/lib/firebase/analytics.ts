"use client";

function logEvent(_name: string, _params?: Record<string, string | number | boolean>) {
  // Analytics is disabled when Firebase is not configured
}

export const firebaseAnalytics = {
  pageView: (page: string, title?: string) => {
    logEvent("page_view", { page_path: page, page_title: title || page });
  },

  scholarshipView: (scholarshipId: string, name: string) => {
    logEvent("view_item", {
      item_id: scholarshipId,
      item_name: name,
      item_category: "scholarship",
    });
  },

  universityView: (universityId: string, name: string) => {
    logEvent("view_item", {
      item_id: universityId,
      item_name: name,
      item_category: "university",
    });
  },

  search: (query: string, resultsCount: number) => {
    logEvent("search", { search_term: query, results_count: resultsCount });
  },

  aiChat: (messageLength: number) => {
    logEvent("ai_chat_message", { message_length: messageLength });
  },

  documentGenerated: (type: string) => {
    logEvent("document_generated", { document_type: type });
  },

  applicationStarted: (universityId: string) => {
    logEvent("begin_checkout", {
      item_id: universityId,
      item_category: "application",
    });
  },

  signIn: (method: string) => {
    logEvent("login", { method });
  },

  signUp: (method: string) => {
    logEvent("sign_up", { method });
  },

  share: (contentType: string, contentId: string) => {
    logEvent("share", { content_type: contentType, content_id: contentId });
  },
};
