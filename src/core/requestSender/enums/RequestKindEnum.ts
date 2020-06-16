/**
 * Kind of request
 */
export enum RequestKindEnum {
  /**
   * Request sent by user, can be only one
   */
  SEND_BY_USER = 'send_by_user',

  /**
   * Request sent by user asynchronously, number of requests depends on settings.
   */
  SEND_BY_USER_ASYNCHRONOUSLY = 'send_by_user_asynchronously',

  /**
   * Request sent automatically, for example by a bot, unlimited number of requests can be sent
   */
  SEND_AUTOMATICALLY = 'send_automatically'
}
