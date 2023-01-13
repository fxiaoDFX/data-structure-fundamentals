class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class BST {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b)
        this.root = this.buildTree(sortedArray)
    }

    buildTree(array) {
        if (array.length === 0) return null

        const mid = Math.floor(array.length / 2)
        const node = new Node(array[mid])
        node.left = this.buildTree(array.slice(0, mid))
        node.right = this.buildTree(array.slice(mid + 1))

        return node
    }

    insert(data) {
        try {
            this.root = this.#insert(data, this.root)
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    #insert(data, root) {
        if (!root) return new Node(data)

        if (data === root.data) throw "Duplicates not allowed"
        if (data < root.data) root.left = this.#insert(data, root.left)

        if (data > root.data) root.right = this.#insert(data, root.right)

        return root
    }

    find(value, node = this.root) {
        if (!node || node.data === value) return node

        if (value < node.data) return this.find(value, node.left)
        else return this.find(value, node.right)
    }

    traverse(value) {
        return
    }

    #traverse(value, root) {
        return
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            )
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            )
        }
    }
}

const test = (() => {
    const array = [1, 0, 1, 2, 3, 7, 5, 3]
    console.log([...new Set(array)].sort((a, b) => a - b))
    const tree = new BST(array)
    tree.insert(10)
    tree.insert(-1)
    tree.insert(0)
    tree.prettyPrint()
    console.log(tree.find(2))
})()

export default test
