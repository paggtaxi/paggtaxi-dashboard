import { DefaultWidgetRegistry } from "angular2-schema-form/src";
import { SwitchWidgetComponent } from "./widgets/switch-widget/switch-widget.component";

export class CustomWidgetRegistry extends DefaultWidgetRegistry {

  constructor() {
    super();
    this.register('switch', SwitchWidgetComponent);
  }

}