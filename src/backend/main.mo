import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Language = {
    #en_US;
    #de_DE;
    #es_ES;
    #fr_FR;
    #pt_PT;
    #it_IT;
    #ru_RU;
    #ja_JP;
    #zh_CN;
    #ko_KR;
    #ar_SA;
    #hi_IN;
    #tr_TR;
  };

  public type ExplanationLevel = Nat;

  public type UserSettings = {
    language : Language;
    explanationLevel : ExplanationLevel;
  };

  public type ConversationMessage = {
    role : Text;
    content : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    settings : UserSettings;
    conversationHistory : [ConversationMessage];
  };

  let defaultSettings : UserSettings = {
    language = #en_US;
    explanationLevel = 1;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Get caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get another user's profile (admin only or own profile)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Save user settings (requires user role)
  public shared ({ caller }) func saveUserSettings(settings : UserSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save settings");
    };

    switch (settings.language) {
      case (#ar_SA or #hi_IN or #tr_TR) {
        Runtime.trap("Currently only English, German, Spanish, French, Portuguese, Italian, Russian, Japanese, Chinese and Korean are supported. Arabic, Hindi and Turkish are coming soon.");
      };
      case (_) {
        let currentProfile = userProfiles.get(caller);
        let conversationHistory = switch (currentProfile) {
          case (null) { [] };
          case (?profile) { profile.conversationHistory };
        };
        let newProfile : UserProfile = {
          settings = settings;
          conversationHistory = conversationHistory;
        };
        userProfiles.add(caller, newProfile);
      };
    };
  };

  // Get user settings (requires user role)
  public query ({ caller }) func getUserSettings() : async UserSettings {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access settings");
    };

    switch (userProfiles.get(caller)) {
      case (null) { defaultSettings };
      case (?profile) { profile.settings };
    };
  };

  // Save conversation message (requires user role)
  public shared ({ caller }) func saveConversationMessage(message : ConversationMessage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save conversation messages");
    };

    let currentProfile = userProfiles.get(caller);
    let settings = switch (currentProfile) {
      case (null) { defaultSettings };
      case (?profile) { profile.settings };
    };
    let history = switch (currentProfile) {
      case (null) { [] };
      case (?profile) { profile.conversationHistory };
    };

    let newHistory = history.concat([message]);
    let newProfile : UserProfile = {
      settings = settings;
      conversationHistory = newHistory;
    };
    userProfiles.add(caller, newProfile);
  };

  // Get conversation history (requires user role)
  public query ({ caller }) func getConversationHistory() : async [ConversationMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access conversation history");
    };

    switch (userProfiles.get(caller)) {
      case (null) { [] };
      case (?profile) { profile.conversationHistory };
    };
  };

  // Clear conversation history (requires user role)
  public shared ({ caller }) func clearConversationHistory() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear conversation history");
    };

    let currentProfile = userProfiles.get(caller);
    let settings = switch (currentProfile) {
      case (null) { defaultSettings };
      case (?profile) { profile.settings };
    };

    let newProfile : UserProfile = {
      settings = settings;
      conversationHistory = [];
    };
    userProfiles.add(caller, newProfile);
  };
};
