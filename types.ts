export interface TranslationRequest {
  text: string;
}

export interface TranslationResult {
  translatedText: string;
  error?: string;
}

export enum TranslationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}