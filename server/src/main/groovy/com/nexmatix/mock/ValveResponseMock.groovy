package com.nexmatix.mock

//TODO: Replace with actual Google Cloud Datastore API
class ValveResponseMock {

    static String getResponse() {
        """
{
  "summary": [
    {
      "cycle_count": 162,
      "faults": 0,
      "inputs": 2,
      "pressure": 347,
      "station": 0
    },
    {
      "cycle_count": 10,
      "faults": 0,
      "inputs": 3,
      "pressure": 270,
      "station": 1
    },
    {
      "cycle_count": 18,
      "faults": 0,
      "inputs": 3,
      "pressure": 373,
      "station": 2
    },
    {
      "cycle_count": 18,
      "faults": 0,
      "inputs": 3,
      "pressure": 160,
      "station": 3
    },
    {
      "cycle_count": 18,
      "faults": 0,
      "inputs": 3,
      "pressure": 264,
      "station": 4
    },
    {
      "cycle_count": 18,
      "faults": 0,
      "inputs": 3,
      "pressure": 165,
      "station": 5
    },
    {
      "cycle_count": 19,
      "faults": 0,
      "inputs": 3,
      "pressure": 117,
      "station": 6
    },
    {
      "cycle_count": 17,
      "faults": 0,
      "inputs": 3,
      "pressure": 405,
      "station": 7
    },
    {
      "cycle_count": 22,
      "faults": 0,
      "inputs": 3,
      "pressure": 427,
      "station": 8
    },
    {
      "cycle_count": 5,
      "faults": 0,
      "inputs": 3,
      "pressure": 484,
      "station": 9
    }
  ],
  "manifold_sn": 0
}
        """

    }
}