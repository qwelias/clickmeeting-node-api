"use strict";

const request = require("request");
const fs = require("fs");
const path = require("path");

const SETUP = {
    key: null,
    base: 'https://api.clickmeeting.com/v1/'
}
const CLAPI = {};

function jsonToQueryString(json) {
    if(!json) return "";
    return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

CLAPI.setup = (setup) => {
    Object.assign(SETUP, setup);
};

CLAPI.sendRequest = (method, url, body, formData) => {
    if(!SETUP.key) return null;
    url = SETUP.base+url+"/"+jsonToQueryString(body);
    return new Promise((resolve, reject) => {
        request({
            method,
            url,
            formData,
            headers: {
                "X-Api-Key": SETUP.key
            }
        }, (e, res, body) => {
            if(e) reject({
                e,
                res
            });
            else resolve({
                res,
                body
            });
        });
    });
};

CLAPI.conferences = (status) => {
    status = status || "active";
    return CLAPI.sendRequest('GET', 'conferences/' + status);
}

CLAPI.conference = (room_id) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id);
}

CLAPI.addConference = (params) => {
    return CLAPI.sendRequest('POST', 'conferences', params);
}

CLAPI.editConference = (room_id, params) => {
    return CLAPI.sendRequest('PUT', 'conferences/' + room_id, params);
}

CLAPI.deleteConference = (room_id) => {
    return CLAPI.sendRequest('DELETE', 'conferences/' + room_id);
}

CLAPI.conferenceAutologinHash = (room_id, params) => {
    return CLAPI.sendRequest('POST', 'conferences/' + room_id + '/room/autologin_hash', params);
}

CLAPI.sendConferenceEmailInvitations = (room_id, lang, params) => {
    lang = lang || 'en';
    return CLAPI.sendRequest('POST', 'conferences/' + room_id + '/invitation/email/' + lang, params);
}

CLAPI.conferenceSkins = () => {
    return CLAPI.sendRequest('GET', 'conferences/skins');
}

CLAPI.generateConferenceTokens = (room_id, params) => {
    return CLAPI.sendRequest('POST', 'conferences/' + room_id + '/tokens', params);
}

CLAPI.conferenceTokens = (room_id) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/tokens');
}

CLAPI.conferenceSessions = (room_id) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/sessions');
}

CLAPI.conferenceSession = (room_id, session_id) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/sessions/' + session_id);
}

CLAPI.conferenceSessionAttendees = (room_id, session_id) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/sessions/' + session_id + '/attendees');
}

CLAPI.generateConferenceSessionPDF = (room_id, session_id, lang) => {
    lang = lang || 'en';
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/sessions/' + session_id + '/generate-pdf/' + lang);
}

CLAPI.timeZoneList = () => {
    return CLAPI.sendRequest('GET', 'time_zone_list');
}

CLAPI.countryTimeZoneList = (country) => {
    return CLAPI.sendRequest('GET', 'time_zone_list/' + country);
}

CLAPI.phoneGatewayList = () => {
    return CLAPI.sendRequest('GET', 'phone_gateways');
}

CLAPI.addConferenceRegistration = (room_id, params) => {
    return CLAPI.sendRequest('POST', 'conferences/' + room_id + '/registration', params);
}

CLAPI.conferenceRegistrations = (room_id, status) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/registrations/' + status);
}

CLAPI.conferenceSessionRegistrations = (room_id, session_id, status) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/sessions' + session_id + '/registrations/' + status);
}

CLAPI.fileLibrary = () => {
    return CLAPI.sendRequest('GET', 'file-library');
}

CLAPI.conferenceFileLibrary = (room_id) => {
    return CLAPI.sendRequest('GET', 'file-library/conferences/' + room_id);
}

CLAPI.fileLibraryFile = (file_id) => {
    return CLAPI.sendRequest('GET', 'file-library/' + file_id);
}

CLAPI.addFileLibraryFile = (file_path) => {
    return CLAPI.sendRequest('POST', 'file-library', null, {
        uploaded: fs.createReadStream(path.resolve(file_path))
    });
}

CLAPI.fileLibraryContent = (file_id) => {
    return CLAPI.sendRequest('GET', 'file-library/' + file_id + '/download');
}

CLAPI.deleteFileLibraryFile = (file_id) => {
    return CLAPI.sendRequest('DELETE', 'file-library/' + file_id);
}

CLAPI.conferenceRecordings = (room_id) => {
    return CLAPI.sendRequest('GET', 'conferences/' + room_id + '/recordings');
}

CLAPI.deleteConferenceRecordings = (room_id) => {
    return CLAPI.sendRequest('DELETE', 'conferences/' + room_id + '/recordings');
}

CLAPI.deleteConferenceRecording = (room_id, recording_id) => {
    return CLAPI.sendRequest('DELETE', 'conferences/' + room_id + '/recordings/' + recording_id);
}

CLAPI.chats = () => {
    return CLAPI.sendRequest('GET', 'chats');
}

CLAPI.conferenceSessionChats = (session_id) => {
    return CLAPI.sendRequest('GET', 'chats/' + session_id);
}

module.exports = Object.freeze(CLAPI);
