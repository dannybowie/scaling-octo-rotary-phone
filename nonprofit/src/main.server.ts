import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

// The Angular server renderer will call the exported default function with a
// BootstrapContext. Forward that context into bootstrapApplication so a
// platform injector is created per request (fixes NG0401 Missing Platform).
const bootstrap = (context?: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
