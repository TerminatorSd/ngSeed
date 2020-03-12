import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  showAlert(ctx, text, type) {
    ctx.alertVar.show = true;
    ctx.alertVar.text = text;
    ctx.alertVar.type = type;
    setTimeout(() => {
      ctx.alertVar.show = false;
    }, 800);
  }
}
