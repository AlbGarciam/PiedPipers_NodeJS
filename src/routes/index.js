/**
 * @namespace Routes
 * @property {module:routes/user} UserRouter Prepares routes for users
 * @property {module:routes/profile} ProfileRouter Prepares routes for profiles
 * @property {module:routes/local} LocalRouter Prepares routes for locals
 * @property {module:routes/search} SearchRouter Prepares routes for searchs
 * @property {module:routes/notification} NotificationRouter Prepares routes for notifications
 */
import User from './user';
import Profile from './profile';
import Search from './search';
import Local from './local';
import Notification from './notification';

export { User, Profile, Search, Local, Notification };
