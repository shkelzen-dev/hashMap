class List{
  constructor(){
    this.head = null;
  }
}
class Node{
  constructor(key,value){
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap{
     constructor(){
        this.capacity = 4;
        this.buckets = new Array(this.capacity).fill(null);
        this.loadFactor = 0.8;
     }

    hash(key){
        this.hashCode = 0;
        this.primeNumber = 31;
        for(let i=0; i<key.length; i++){
          this.hashValue = (this.primeNumber * this.hashCode + key.charCodeAt(i)) % this.capacity;
          if(this.hashValue < 0 || this.hashValue >= this.capacity){
            throw new Error("Trying to access index out of bound");
          }else{
            this.hashCode = this.hashValue;
          }
        }
        return this.hashCode;
      }

    set(key, value){
      this.newNode = new Node(key,value);
      if(this.buckets[this.hash(key)] == null || this.buckets[this.hash(key)] == undefined){
        this.buckets[this.hash(key)] = new List;
        this.buckets[this.hash(key)].head = this.newNode;
      }
      else{
        this.current = this.buckets[this.hash(key)].head;
        while(this.current.next != null){
          if(this.current.key == key){
            this.current.value = value ;
            return ;
          }else{
            this.current = this.current.next;
          }
        }this.current.next = this.newNode;
      }
      this.resize();
    }
    get(key){
        if(this.buckets[this.hash(key)] != undefined){
          this.current = this.buckets[this.hash(key)].head;
        }else{
          return null;
        }
        while(this.current.key != key && this.current.next != null){
          this.current = this.current.next;
        }if(this.current.key == key){
          return this.current.value;
        }else{
          return null;
        }
    }
    has(key){
        if(this.buckets[this.hash(key)] == null || this.buckets[this.hash(key)] == undefined){
          return false;
        }else{
          this.current = this.buckets[this.hash(key)].head;
          while(this.current != null){
            if(this.current.key == key){
              return true;
            }else{
              this.current = this.current.next;
            }
          }return false;
        }
    }
    remove(key){
      this.current = this.buckets[this.hash(key)].head;
      this.nextNode = this.current.next;
      while(this.buckets[this.hash(key)] != null || this.buckets[this.hash(key) != undefined]){
        if(this.current.key == key){
          this.buckets[this.hash(key)].head = this.current.next;
          return true;
        }else if(this.nextNode.key == key){
          this.current.next = this.nextNode.next;
          return true;
        }else{
          this.current = this.current.next;
          this.nextNode = this.nextNode.next;
        }
      }return false;
    }
    length(){
      this.storedKeys = 0;
      this.buckets.forEach(bucket =>{
        if(bucket != null || bucket != undefined){
          this.current = bucket.head;
          while(this.current != null){
            this.storedKeys++;
            this.current = this.current.next;
          }return ;
        }
      });
      return this.storedKeys;
    }
    resize(){
      if(this.length()/this.capacity >= this.loadFactor){
        this.capacity = this.capacity * 2 ;
        this.newBuckets = new Array(this.capacity).fill(null);
        this.buckets.forEach(bucket =>{
          if(bucket != null){
            this.current = bucket.head;
            while(this.current != null){
            this.newNodeBucket = new Node(this.current.key, this.current.value);
            if(this.newBuckets[this.hash(this.current.key)] == null){
              this.newBuckets[this.hash(this.current.key)] = new List;
              this.newBuckets[this.hash(this.current.key)].head = this.newNodeBucket;
            }else{
              this.newListCurrent = this.newBuckets[this.hash(this.current.key)].head;
              while(this.newListCurrent.next != null){
                this.newListCurrent = this.newListCurrent.next;
              }this.newListCurrent.next = this.newNodeBucket;
            }this.current = this.current.next;
          }
        }
        });
        this.buckets = this.newBuckets;
      }
    }
    clear(){
      this.buckets.forEach(bucket =>{
        bucket.head = null;
      })
    }
    keys(){
      this.keysArray = [];
      this.buckets.forEach(bucket =>{
        if(bucket != null || bucket != undefined){
          this.current = bucket.head;
          while(this.current != null){
            this.keysArray.push(this.current.key);
            this.current = this.current.next;
          }
        }
      });
      return this.keysArray;
    }
    values(){
      this.valuesArray = [];
      this.buckets.forEach(bucket => {
        if(bucket != null){
          this.current = bucket.head;
          while(this.current !=null){
            this.valuesArray.push(this.current.value);
            this.current = this.current.next;
          }
        }
      });
      return this.valuesArray;
    }
    entries(){
      this.keyValue = [];
      this.buckets.forEach(bucket =>{
        if(bucket != null){
          this.current = bucket.head;
          while(this.current != null){
            this.pairsArray = [];
            this.pairsArray.push(this.current.key);
            this.pairsArray.push(this.current.value);
            this.keyValue.push(this.pairsArray);
            this.current = this.current.next;
          }
        }
      });
      return this.keyValue;
    }
}

