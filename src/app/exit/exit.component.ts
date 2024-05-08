import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-exit',
  standalone: true,
  imports: [
    CommonModule, MatIconModule
  ],
  templateUrl: './exit.component.html',
  styleUrl: './exit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitComponent { }
