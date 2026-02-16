import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserSettings, ConversationMessage, UserProfile } from '../backend';

export function useGetUserSettings() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserSettings();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useSaveUserSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: UserSettings) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveUserSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] });
    },
  });
}

export function useGetConversationHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ConversationMessage[]>({
    queryKey: ['conversationHistory'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getConversationHistory();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useSaveConversationMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: ConversationMessage) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveConversationMessage(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversationHistory'] });
    },
  });
}

export function useClearConversationHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearConversationHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversationHistory'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
