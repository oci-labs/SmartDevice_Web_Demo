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
trait DataStoreService<T> {

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService()
    String kind = T.class.name
    KeyFactory keyFactory = datastore.newKeyFactory().setKind(kind)

    List<T> listEntities(Integer max, Integer offset) {
        Query<Entity> query = Query.newEntityQueryBuilder()       // Build the Query
                .setKind(kind)                                     // We only care about Books
                .setLimit(max)                                         // Only show 10 at a time
                .build()
        QueryResults<Entity> resultList = datastore.run(query)   // Run the query

        return transformEntities(resultList)
    }


    T retrieveEntity(String id) {

        Key key = keyFactory.newKey(id)

        transformEntity(datastore.get(key))
    }


    abstract List<T> transformEntities(QueryResults<Entity> results)
    abstract T transformEntity(Entity entity)

    Key getKey(String id) {
        return keyFactory.newKey(id)
    }

}