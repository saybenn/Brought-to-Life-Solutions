export const EVENT = {
  VIEW_PAGE: "view page",
  CTA_CLICK: "click cta",
  FORM_SUBMIT: "submit form",
  START_CHECKOUT: "start checkout",
  CANCEL_CHECKOUT: "cancel checkout",
  SCROLL_DEPTH: "scroll depth",
  COMPLETE_CHECKOUT: "complete checkout",
} as const;

export const INTENT_EVENTS = [EVENT.CTA_CLICK, EVENT.FORM_SUBMIT] as const;
