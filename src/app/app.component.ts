import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timeline';
    startDate = new Date('2026-03-01');
  daysToShow = 30;
  dayWidth = 40;

  days: Date[] = [];

  projects = [
    {
      name: "New Build",
      events: [
        { title: "Phase 1", start: '2026-03-01', end: '2026-03-10', color: '#ff4da6' },
        { title: "Phase 2", start: '2026-03-05', end: '2026-03-20', color: '#ff4da6' }
      ]
    },
    {
      name: "Project A",
      events: [
        { title: "Phase 1", start: '2026-03-02', end: '2026-03-18', color: '#4dabf7' }
      ]
    },
    {
      name: "Project B",
      events: [
        { title: "Phase 1", start: '2026-03-03', end: '2026-03-20', color: '#b517f2' }
      ]
    }
  ];

  ngOnInit() {
    for (let i = 0; i < this.daysToShow; i++) {
      const d = new Date(this.startDate);
      d.setDate(d.getDate() + i);
      this.days.push(d);
    }
  }

  getEventStyle(event: any) {

    const MS_PER_DAY = 86400000;

    const start = new Date(event.start);
    const end = new Date(event.end);

    const offsetDays = (start.getTime() - this.startDate.getTime()) / MS_PER_DAY;
    const durationDays = (end.getTime() - start.getTime()) / MS_PER_DAY;

    return {
      left: offsetDays * this.dayWidth + 'px',
      width: durationDays * this.dayWidth + 'px',
      background: event.color
    };
  }
  draggingEvent: any = null;
dragStartX = 0;
originalStart!: Date;
originalEnd!: Date;

  startDrag(mouseEvent: MouseEvent, event: any) {

  this.draggingEvent = event;

  this.dragStartX = mouseEvent.clientX;

  this.originalStart = new Date(event.start);
  this.originalEnd = new Date(event.end);

  document.addEventListener('mousemove', this.onDragging);
  document.addEventListener('mouseup', this.stopDrag);

}

onDragging = (mouseEvent: MouseEvent) => {

  if (!this.draggingEvent) return;

  const deltaX = mouseEvent.clientX - this.dragStartX;

  const daysMoved = Math.round(deltaX / this.dayWidth);

  const newStart = new Date(this.originalStart);
  newStart.setDate(newStart.getDate() + daysMoved);

  const newEnd = new Date(this.originalEnd);
  newEnd.setDate(newEnd.getDate() + daysMoved);

  this.draggingEvent.start = newStart.toISOString();
  this.draggingEvent.end = newEnd.toISOString();

}

stopDrag = () => {

  if (!this.draggingEvent) return;

  const confirmMove = confirm("Move event to new date?");

  if (!confirmMove) {

    this.draggingEvent.start = this.originalStart.toISOString();
    this.draggingEvent.end = this.originalEnd.toISOString();

  }

  this.draggingEvent = null;

  document.removeEventListener('mousemove', this.onDragging);
  document.removeEventListener('mouseup', this.stopDrag);

}
}
