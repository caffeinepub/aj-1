import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserSettings {
    explanationLevel: ExplanationLevel;
    language: Language;
}
export interface ConversationMessage {
    content: string;
    role: string;
    timestamp: bigint;
}
export interface UserProfile {
    conversationHistory: Array<ConversationMessage>;
    settings: UserSettings;
}
export type ExplanationLevel = bigint;
export enum Language {
    fr_FR = "fr_FR",
    tr_TR = "tr_TR",
    ar_SA = "ar_SA",
    hi_IN = "hi_IN",
    ja_JP = "ja_JP",
    en_US = "en_US",
    es_ES = "es_ES",
    zh_CN = "zh_CN",
    it_IT = "it_IT",
    pt_PT = "pt_PT",
    de_DE = "de_DE",
    ko_KR = "ko_KR",
    ru_RU = "ru_RU"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearConversationHistory(): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversationHistory(): Promise<Array<ConversationMessage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserSettings(): Promise<UserSettings>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveConversationMessage(message: ConversationMessage): Promise<void>;
    saveUserSettings(settings: UserSettings): Promise<void>;
}
