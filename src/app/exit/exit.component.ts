import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-exit',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, RouterLink
  ],
  templateUrl: './exit.component.html',
  styleUrl: './exit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitComponent { }
