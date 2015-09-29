# API Specification

get         /api/tasks              get all tasks from the server
get         /api/task/:task_id      get a single post by id
delete      /api/task/:task_id      delete a single post by id

post        /api/tasks              post a new task to the server
                                                                    - title           String  required
                                                                    - description     String  required
                                                                    - asigneeId       Number  required
                                                                    - pomodoroTicks   Number  required
                                                                    
put         /api/task               update a single task by id
                                                                    - title           String  required
                                                                    - description     String  required
                                                                    - asigneeId       Number  required
                                                                    - pomodoroTicks   Number  requried
                                                               