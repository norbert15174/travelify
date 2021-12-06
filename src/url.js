const url = "http://localhost:8020";

export const endpoints = {
  login: url + "/auth/login",
  register: url + "/auth/register",
  changePassword: url + "/auth/password", // [ PUT ]
  getLoggedUserFriends: url + "/friends",
  getLoggedUserProfile: url + "/user/profile",
  getLoggedUserAlbums: url + "/albums",
  getLoggedUserSharedAlbums: url + "/albums/shared",
  getAlbumDetails: url + "/albums/", // + albumId
  updateUserProfile: url + "/user/profile",
  getLoggedUserProfileBasic: url + "/user/profile/basic",
  setUserBackgroundPicture: url + "/user/background",
  setUserProfilePicture: url + "/user/picture",
  getCountriesList: url + "/data/countries",
  getSelectedUserProfile: url + "/user/profile/full/", // + userId
  getSelectedUserFriends: url + "/friends/", // + userId
  sendInvitation: url + "/friends?id=",
  deleteFriend: url + "/friends/delete/", // + userId
  shareAlbumWithUser: url + "/albums/shared/", // + albumId
  deleteShare: url + "/albums/shared/", // NO ALBUM ID FOR DELETING SHARE
  addAlbum: url + "/albums/add",
  setAlbumMainPhoto: url + "/albums/mainphoto/", // + albumId
  addSingleImageToAlbum: url + "/photos/", // + albumId
  addMultiPhotos: url + "/photos/multiple/", // + albumId
  deletePhotosFromAlbum: url + "/photos/delete",
  deleteAlbum: url + "/albums?id=",
  tagPersonOnPhoto: url + "/photos/add/tagged/", // + photoId
  deleteTag: url + "/photos/tagged/", // + photoId
  addComment: url + "/photos/comment/", // + photoId
  getFriendsRequests: url + "/friends/requests",
  invitationHandler: url + "/friends?id=", // invitationId, for accept PUT // senderId, for decline DELETE
  editAlbum: url + "/albums/", // + albumId
  updatePhotoDescription: url + "/photos/modify/", // + photoId
  getPhotoComments: url + "/photos/comments/", // + photoId
  getPhotoTags: url + "/photos/tagged/", // + photoId
  getPhotoDescription: url,
  getPhoto: url + "/photos/", // + photoId
  getNews: url + "/news?page=", // page number
  getMarkersWithAlbums: url + "/public",
  getPreviewAlbum: url + "/public/", // + public album id
  getRequestsStatus: url + "/friends/requests/sent",
  getMessage: url + "/friends/message/", //+ friends id, page
  sendMessage: url + "/friends/message/", //+ friends id
  refreshMessages: url + "/friends/message/new/", //+ friends id
  getNotifications: url + "/news/notification",
  createGroup: url + "/group", // POST
  getGroups: url + "/group", // GET
  getGroupDetails: url + "/group/", // + groupId, GET
  inviteToGroup: url + "/group/", // membersToAdd: [...], PUT
  removeMember: url + "/group/member/", // + groupId, DELETE
  leaveGroup: url + "/group/:id/leave", // :id - groupId, DELETE
  editGroup: url + "/group/", // PUT
  deleteGroup: url + "/group/", // + groupId, DELETE
  setGroupPicture: url + "/group/photo/", // + groupId, POST
  changeOwner: url + "/group/owner/", // + groupId/?userId=:id, PUT
  getGroupMemberRequests: url + "/group/request/", // + groupId
  getUserGroupRequests: url + "/group/user/",
  getGroupNotifications: url + "/group/user/notification",
  groupInvitationHandler: url + "/group/user/", // + requestId, PUT
  getGroupAlbums: url + "/group/:groupId/albums",
  createGroupAlbum: url + "/group/albums/", // + groupId, POST
  getGroupAlbumDetails: url + "/group/albums/:groupAlbumId/full",
  getGroupAlbumHistory: url + "/group/albums/history/:groupAlbumId/", // + ?page=page_number
  getGroupPhotoDetails: url + "/group/albums/photos/", // + groupPhotoId
  addGroupPhotoComment: url + "/group/albums/photos/:groupPhotoId/comments", // POST
  updateGroupPhotoDescription: url + "/group/albums/photos/", // + groupPhotoId, PUT, query: /?=description="..."
  tagPersonOnGroupPhoto: url + "/group/albums/photos/:groupPhotoId/tag", // PUT
  untagPersonOnGroupPhoto: url + "/group/albums/photos/:groupPhotoId/untag", // PUT
  editGroupAlbum: url + "/group/albums/", // + groupAlbumId, PUT
  addSinglePhotoToGroupAlbum: url + "/group/albums/photos/", // +groupAlbumId, POST
  addMultiplePhotosToGroupAlbum: url + "/group/albums/photos/multiple/", // +groupAlbumId, POST
  setGroupAlbumMainPhoto: url + "/group/albums/main/", // + groupAlbumId, PUT
  getGroupMembers: url + "/group/:groupId/members",
  deleteGroupAlbum: url + "/group/albums/", // + groupAlbumId, DELETE
  deleteGroupPhoto: url + "/group/albums/photos/delete", // + groupPhotoId, DELETE
  checkIfLogged: url + "/user/logged", // GET
  searchUsers: url + "/user/search/?page=", // GET, requestParam /?=page="0", and params
  searchAlbums: url + "/albums/search/?page=", // GET, requestParam /?=page="0", and params
};
