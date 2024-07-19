document.addEventListener('alpine:init', () => {
  Alpine.data('multiselect', (config) => ({
    items: config.items ?? [],
    allItems: null,
    selectedItems: null,
    search: '',
    searchPlaceholder: config.searchPlaceholder ?? 'Type here...',
    expanded: config.expanded ?? false,
    emptyText: config.emptyText ?? "No items found...",
    allowDuplicates: config.allowDuplicates ?? false,
    size: config.size ?? 6,
    itemHeight: config.itemHeight ?? 60,
    maxItemChars: config.maxItemChars ?? 50,
    maxTagChars: config.maxTagChars ?? 25,
    activeIndex: -1,

    onInit() {
      this.allItems = [...this.items]

      this.$watch('filteredItems', (newValues, oldValues) => {
        if (newValues.length !== oldValues.length) {
          this.activeIndex = -1
        }
      })

      this.$watch('selectedItems', (newValues, oldValues) => {
        if (this.allowDuplicates) return
        this.allItems = this.items.filter((item, idx, all) =>
          newValues.every((n) => n.value !== item.value)
        )
      })

      this.$watch('activeIndex', (newValue, oldValue) => {
        if(newValue == -1 || !this.filteredItems[newValue] || !this.expanded) return

        this.scrollToActiveElement()
      })

      this.selectedItems = this.allItems.filter(item => item.selected)
    },
    reset() {
      this.expanded = false
      this.activeIndex = -1
      this.search = ''
    },
    handleBlur(event) {
      if (this.$el.contains(event.relatedTarget)) {
        return
      }
      this.expanded = false

    },
    get filteredItems() {
      return this.allItems.filter(
        item => item.label.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    get listBoxStyle() {
      return {
        maxHeight: `${this.size * this.itemHeight + 2}px`
      }
    },
    handleItemClick(item) {
      this.selectedItems.push(item)
      this.search = ''
      this.$refs.searchInput.focus()
    },
    removeElementByIdx(idx) {
      this.selectedItems.splice(idx, 1)
    },
    selectNextItem() {
      if (!this.filteredItems.length) {
        return
      }
      if (this.filteredItems.length -1 == this.activeIndex) {
        return (this.activeIndex = 0)
      }
      this.activeIndex ++
    },
    selectPrevItem() {
      if (!this.filteredItems.length) {
        return
      }
      if ((this.activeIndex == 0) || (this.activeIndex == -1)) {
        return this.activeIndex = this.filteredItems.length - 1
      }
      this.activeIndex --
    },
    addActiveItem() {
      if(!this.filteredItems[this.activeIndex]) return

      this.selectedItems.push(this.filteredItems[this.activeIndex])
    },
    scrollToActiveElement() {
      const availableListElements =  [...this.$refs.listBox.children].slice(2, -1)
      availableListElements[this.activeIndex].scrollIntoView({
        block: 'end'
      })
    },
    shortendLabel(label, maxChars) {
      return !maxChars || label.length <= maxChars
        ? label
        : `${label.substr(0, maxChars)}...`
    }
  }))
})
