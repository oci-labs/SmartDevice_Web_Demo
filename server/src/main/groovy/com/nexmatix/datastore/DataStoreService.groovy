package com.nexmatix.datastore

import com.google.cloud.datastore.Cursor
import com.google.cloud.datastore.Datastore
import com.google.cloud.datastore.DatastoreOptions
import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.Key
import com.google.cloud.datastore.KeyFactory
import com.google.cloud.datastore.Query
import com.google.cloud.datastore.QueryResults
/**
 * Created by zak on 7/31/17.
 */
trait DataStoreService {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService()
    KeyFactory keyFactory = datastore.newKeyFactory().setKind(kind)
    String kind = 'none'


    List<Object> listEntities(Integer max, Integer offset) {

//        Cursor startCursor = null;
//        if (startCursorString != null && !startCursorString.equals("")) {
//            startCursor = Cursor.fromUrlSafe(startCursorString);    // Where we left off
//        }

        Query<Entity> query = Query.newEntityQueryBuilder()       // Build the Query
                .setKind(kind)                                     // We only care about Books
                .setLimit(max)                                         // Only show 10 at a time
                //.setStartCursor(startCursor)                          // Where we left off
                //.setOrderBy(OrderBy.asc(Book.TITLE))                  // Use default Index "title"
                .build()
        QueryResults<Entity> resultList = datastore.run(query)   // Run the query

        return transformEntities(resultList)
    }


    abstract def transformEntities(QueryResults<Entity> results)

    Key getKey(String id) {
        return keyFactory.newKey(id)
    }

}