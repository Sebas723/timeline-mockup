import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timeline';
  selectedProject = 'projectA';

  projects: any = {

    projectA: [
      {
        title: 'Design',
        start: '2026-03-02',
        end: '2026-03-06',
        color: '#ff4da6'
      },
      {
        title: 'Development',
        start: '2026-03-05',
        end: '2026-03-15',
        color: '#4dabf7'
      },
      {
        title: 'Testing',
        start: '2026-03-14',
        end: '2026-03-20',
        color: '#51cf66'
      }
    ],

    projectB: [
      {
        title: 'Planning',
        start: '2026-03-01',
        end: '2026-03-04',
        color: '#f59f00'
      },
      {
        title: 'Implementation',
        start: '2026-03-05',
        end: '2026-03-18',
        color: '#845ef7'
      },
      {
        title: 'QA',
        start: '2026-03-19',
        end: '2026-03-25',
        color: '#20c997'
      }
    ]

  };

  calendarOptions: any = {
    plugins: [
      interactionPlugin,
      timeGridPlugin,
      dayGridPlugin
    ],

    initialView: 'timeGridWeek',

    editable: true,
    selectable: true,

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth'
    },

    events: []

  };

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    this.calendarOptions.events = this.projects[this.selectedProject];
  }

  changeProject(projectId: string) {

    this.selectedProject = projectId;

    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.projects[projectId]]
    };

  }

}
