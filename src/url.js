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
    getNotifications: url + "/news/notification"
}

// http://localhost:8020/friends/delete/