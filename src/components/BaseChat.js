import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Avatar,
} from 'react-native-gifted-chat';
import {theme} from '../styles/theme';
import ICONS from '../constants/icons';
import {Image} from 'react-native';

const BaseChat = ({messages, onSend, userId, isTyping = false, ...props}) => {
  const renderBubble = bubbleProps => (
    <Bubble
      {...bubbleProps}
      wrapperStyle={{
        left: styles.bubbleLeft,
        right: styles.bubbleRight,
      }}
      textStyle={{
        left: styles.textLeft,
        right: styles.textRight,
      }}
    />
  );

  const renderInputToolbar = toolbarProps => (
    <InputToolbar
      {...toolbarProps}
      containerStyle={styles.inputContainer}
      primaryStyle={styles.inputPrimary}
    />
  );

  const renderSend = sendProps => (
    <Send {...sendProps} containerStyle={styles.sendContainer}>
      <View style={styles.sendButton}>
        <Image
          source={ICONS.ENCRYPT}
          style={styles.sendIcon}
          resizeMode="contain"
        />
      </View>
    </Send>
  );

  const renderAvatar = avatarProps => (
    <Avatar
      {...avatarProps}
      imageStyle={{
        left: styles.avatarStyle,
        right: styles.avatarStyle,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={msgs => onSend(msgs)}
        user={{_id: userId}}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        isTyping={isTyping}
        alwaysShowSend
        scrollToBottom
        inverted={true}
        timeTextStyle={{
          left: styles.timeText,
          right: styles.timeText,
        }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  bubbleLeft: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    borderBottomLeftRadius: 0,
    ...theme.shadows.small,
    marginBottom: theme.spacing.xs,
  },
  bubbleRight: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    borderBottomRightRadius: 0,
    ...theme.shadows.small,
    marginBottom: theme.spacing.xs,
  },
  textLeft: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  textRight: {
    ...theme.typography.body,
    color: theme.colors.surface,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  inputPrimary: {
    alignItems: 'center',
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: theme.spacing.sm,
  },
  sendButton: {
    backgroundColor: theme.colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: theme.colors.surface,
  },
  avatarStyle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  timeText: {
    ...theme.typography.caption,
    fontSize: 10,
  },
});

export default React.memo(BaseChat);
