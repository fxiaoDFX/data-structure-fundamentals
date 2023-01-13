function createNode(value) {
    return {
        value,
        next: null,
    }
}

function createLinkedList() {
    return {
        head: null,
        tail: null,
        size: 0,

        append(value) {
            const node = createNode(value)
            if (this.size === 0) {
                this.head = node
                this.tail = node
            } else {
                this.tail.next = node
                this.tail = node
            }
            this.size++
        },

        prepend(value) {
            const node = createNode(value)
            if (this.size === 0) {
                this.head = node
                this.tail = node
            } else {
                node.next = this.head
                this.head = node
            }

            this.size++
        },

        at(index) {
            if (index >= this.size || index < 0) return "Invalid index!"
            let curr = this.head
            while (index) {
                curr = curr.next
                index--
            }
            return curr
        },

        pop() {
            if (this.size === 0) {
                console.log("Empty list")
                return null
            }

            const removeNode = this.tail
            if (this.size === 1) {
                this.head = null
                this.tail = null
            } else {
                let prev = this.head
                while (prev.next !== this.tail) {
                    prev = prev.next
                }
                this.tail = prev
                prev.next = null
            }
            this.size--
            return removeNode
        },

        contains(value) {
            let curr = this.head
            while (curr !== null) {
                if (curr.value === value) return true

                curr = curr.next
            }
            return false
        },

        find(value) {
            let curr = this.head
            for (let i = 0; i < this.size; i++) {
                if (curr.value === value) return i
                curr = curr.next
            }
            return null
        },

        toString() {
            let string = ""
            let curr = this.head
            while (curr) {
                string += `(${curr.value}) -> `
                curr = curr.next
            }
            return (string += null)
        },
    }
}

const list = createLinkedList()
const empty = createLinkedList()

list.append(5)
list.append(10)
list.append(1)
list.prepend(0)

console.log(list.toString())
console.log(empty.find(1))
