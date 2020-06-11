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
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.FetchOptions.Builder;
import com.google.gson.Gson;
import com.google.sps.data.Comment;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.text.SimpleDateFormat;  
import java.net.*; 
import java.lang.*;
  

/** Servlet responsible for listing comments. */
@WebServlet("/list-comments")
public class ListCommentsServlet extends HttpServlet {
  
  int commentsShown = 10;
  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String commentsShownString = request.getParameter("commentsShown");
    if (commentsShownString == null){
        commentsShown = commentsShown;
    } else {
        commentsShown = Integer.parseInt(commentsShownString);
    }
    response.sendRedirect("/index.html");
  }  

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();
    for (Entity entity : results.asIterable(FetchOptions.Builder.withLimit(commentsShown))) {
      long id = entity.getKey().getId();
      String title = (String) entity.getProperty("title");
      String user = (String) entity.getProperty("user");
      long timestamp = (long) entity.getProperty("timestamp");

    //change to readable date formate   
      long yourmilliseconds = timestamp;
      SimpleDateFormat sdf = new SimpleDateFormat("MMM dd,yyyy HH:mm");    
      Date resultdate = new Date(yourmilliseconds);
      String time = sdf.format(resultdate);

      Comment comment = new Comment(id, title, user, timestamp, time);
      comments.add(comment);
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
  }
}
