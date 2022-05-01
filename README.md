# SignalR for JS or Angular
## Setup
- Requires NodeJS locally
## Scope
- No Authentication and Authorzation (If needed: it simply requires the regular integration for auth/auth of aspnet core)
## Structure of the projects
### Components
- An **index** component that inserts all other smart-components for any other application's roles.
- A **cop-view** component that starts/stops cop's radar-assignation and prints whatever message he receives.
- A **radar-view** component that pushes new speed reports to the hub and logs the report sent.
- An **office-view** component that prints whatever message he receives.
### Services
A NotificationRealTimeService and RadarRealTimeService that handle all interactions between the components and the Hub.  
They hide the **signalr connection** instance and expose *Observables* used by components.
## Feedback & usage
If anything is not clear or missing, feel free to contact me  
📧 esteban.goffaux@satellit.be  
📜 Or directly on MS Teams

❤️ Feel also free to take whatever part of code you want for your personnal or professional project.