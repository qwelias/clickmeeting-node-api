# [ClickMeeting API](http://dev.clickmeeting.com/) for NodeJS.
requires NodeJS v4.2*+

#### CLAPI.setup(setup)
- `setup`
  - `key`: your api key
  - `base`: base url ('https://api.clickmeeting.com/v1/' by default)

Returned Promise format:
* on reject `error`
* on resolve `{response, body}`

#### CLAPI.sendRequest(method, url, body, formData) : Promise
* `url`: relative to `setup.base`
* ?`formData`: format according to **[request](https://github.com/request/request#multipartform-data-multipart-form-uploads)** module
* you can use this method instead of everything below

#### CLAPI.conferences(status) : Promise
#### CLAPI.conference(room_id) : Promise
#### CLAPI.addConference(params) : Promise
#### CLAPI.editConference(room_id, params) : Promise
#### CLAPI.deleteConference(room_id) : Promise
#### CLAPI.conferenceAutologinHash(room_id, params) : Promise
#### CLAPI.sendConferenceEmailInvitations(room_id, lang, params) : Promise
#### CLAPI.conferenceSkins() : Promise
#### CLAPI.generateConferenceTokens(room_id, params) : Promise
#### CLAPI.conferenceTokens(room_id) : Promise
#### CLAPI.conferenceSessions(room_id) : Promise
#### CLAPI.conferenceSession(room_id, session_id) : Promise
#### CLAPI.conferenceSessionAttendees(room_id, session_id) : Promise
#### CLAPI.generateConferenceSessionPDF(room_id, session_id, lang) : Promise
#### CLAPI.timeZoneList() : Promise
#### CLAPI.countryTimeZoneList(country) : Promise
#### CLAPI.phoneGatewayList() : Promise
#### CLAPI.addConferenceRegistration(room_id, params) : Promise
#### CLAPI.conferenceRegistrations(room_id, status) : Promise
#### CLAPI.conferenceSessionRegistrations(room_id, session_id, status) : Promise
#### CLAPI.fileLibrary() : Promise
#### CLAPI.conferenceFileLibrary(room_id) : Promise
#### CLAPI.fileLibraryFile(file_id) : Promise
#### CLAPI.addFileLibraryFile(file_path) : Promise
#### CLAPI.fileLibraryContent(file_id) : Promise
#### CLAPI.deleteFileLibraryFile(file_id) : Promise
#### CLAPI.conferenceRecordings(room_id) : Promise
#### CLAPI.deleteConferenceRecordings(room_id) : Promise
#### CLAPI.deleteConferenceRecording(room_id, recording_id) : Promise
#### CLAPI.chats() : Promise
#### CLAPI.conferenceSessionChats(session_id) : Promise
