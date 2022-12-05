import { Injectable} from '@angular/core';

import * as OT from "@opentok/client";
import config from './config';

@Injectable()
export class OpentokService{
    session!:OT.Session;
    token!: string;

    constructor(){}

    getOT(){
        return OT;
    }

    initSession(){
        let API_KEY = "46386892"
        let SESSION_ID= "1_MX40NjM4Njg5Mn5-MTY2OTg1Nzk4MDcwNX5QRERLa0NZWEpCZjlhZlRXeElXajVWbWl-fg"
        let TOKEN= "T1==cGFydG5lcl9pZD00NjM4Njg5MiZzaWc9MmQ3OTQ5NDI0NGI2ZDhjNmJmY2ZkMTNkZDZmMDU4YjNkYWY0YzAyNDpzZXNzaW9uX2lkPTFfTVg0ME5qTTROamc1TW41LU1UWTJPVGcxTnprNE1EY3dOWDVRUkVSTGEwTlpXRXBDWmpsaFpsUlhlRWxYYWpWV2JXbC1mZyZjcmVhdGVfdGltZT0xNjY5ODU3OTkzJm5vbmNlPTAuMDkwOTU3OTE1MjE4ODcxMDkmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY2OTg2MTYxNSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=="
        if(API_KEY && TOKEN && SESSION_ID){
            this.session = this.getOT().initSession(API_KEY,SESSION_ID);
            this.token = TOKEN;
            return Promise.resolve(this.session);
        }else{
            return fetch(config.SAMPLE_SERVER_BASE_URL + "/session")
                .then(data => data.json())
                .then(json => {
                    this.session = this.getOT().initSession(json.apiKey,json.sessionId);
                    this.token = json.token;
                    return this.session;
                })
        }
    }

    connect(){
        return new Promise((resolve,reject) => {
            this.session.connect(this.token, err =>{
                if(err){
                    reject(err);
                }else{
                    resolve(this.session);
                }
            });
        });
    }
}