import { Component ,OnInit, ChangeDetectorRef} from '@angular/core';
import {OpentokService} from './opentok.service'
import * as OT from "@opentok/client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[OpentokService]
})
export class AppComponent implements OnInit{
  title = 'test-opentok';
  session!: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef!: ChangeDetectorRef;

  constructor(
    private ref: ChangeDetectorRef,
    private opentokService: OpentokService
  ){
    this.changeDetectorRef = ref;
  }

  ngOnInit(): void {
    this.opentokService
      .initSession()
      .then((session: OT.Session) =>{
        console.log(session);
        this.session.on('streamCreated', event =>{
          // this.streams.push(event.stream);
          // this.changeDetectorRef.detectChanges();
        });

        // this.session.on('streamDestroyed', event =>{
        //   const idx = this.streams.indexOf(event.stream);
        //   if(idx > -1){
        //     this.streams.splice(idx,1);
        //     this.changeDetectorRef.detectChanges();
        //   }
        // });
      })
      .then(() => this.opentokService.connect())
      .catch(err => {
        console.error(err);
        alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.')
      });
  }
}
