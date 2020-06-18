// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for creating new tasks. */
@WebServlet("/new-task")
public class NewTaskServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String title = request.getParameter("title");
    long timestamp = System.currentTimeMillis();

    // an Entity with a kind of 'Task' is stored as the taskEntity variable 
    Entity taskEntity = new Entity("Task");
    // adds property to the taslEntity entity
    taskEntity.setProperty("title", title);
    taskEntity.setProperty("timestamp", timestamp);

    // create the instance of the DatastoreService class by creating the variable datastore with the function  
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    // now store taskEntity into the datastore we just made
    datastore.put(taskEntity);

    response.sendRedirect("/index.html");
  }
}