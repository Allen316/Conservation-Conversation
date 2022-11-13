let userMsg = ""
let botMsg = "Sorry, we don't have any information on that animal!"
let anI = -1;
// animal index for dictionaries 
// 0 = orangutan; 1 = tiger; 2 = rhino 
let fI = -1;
// fact index for dictionary 
// 0 = fact 1, 1 = fact 2, 2 = fact 3; 3 = conservation 

function toggleActive(el) {
  el.classList.toggle('active');
}

const fax = {
  0: ["Orangutans rely mainly on facial expressions and body language to communicate.", "Orangutans are known to be very innovative and use tools.", "Orangutans sleep in nests and build fresh ones every night.", "Palm oil extraction is one of their biggest threats, so make sure you buy sustainable palm oil products!"],
  1: ["Tigers existed 2 million years ago.", "A tiger's roar can be heard 3km away.", "India is the country with the most wild tigers.", "Tigers are hunted for fur and body parts for traditional medicines. Poaching and habitat destruction has caused them now to be endangered. There are only about 4500 tigers left in the wild."],
  2: ["During the heat of the day, rhinos can be found sleeping in the shade or wallowing in muddy pools to cool off. The mud protects their skin from the strong sun and wards off biting bugs, too.", "Rhinos are solitary animals and like to avoid each other. But some species, particularly the white rhino, may live in a group, known as a ‘crash’.", "Rhinoceros are a critically endangered species with less than 30,000 rhino living in the wild today.", "The main threats to rhino are poaching and habitat loss.", "Poaching and illegal trade of rhino horns has increased sharply since 2007 and remains one of the major reasons rhino are still endangered today.", "Rhino horn trade has been banned under the Convention on International Trade in Endangered Species (CITES) since 1977, yet the black-market demand for rhino horn is high."],
  3: ["Bamboo counts for 99 percent of a panda's diet, but they will occasionally eat small animals and fish.", "In the wild, they are found in thick bamboo forests, high up in the mountains of central China.", "Baby pandas are born pink, measure about 15cm, and born blind, only opening their eyes six to eight weeks after birth.", "The greatest threat facing wild pandas, and the biggest reason they are critically endangered today, is deforestation on the part of humans, which has led to permanent habitat loss in some areas.", "Pandas are extremely selective about choosing their mates, which means that even if a male and female panda are kept in the same enclosure for years, there is no guarantee the pair will mate"],
  4: ["A newborn elephant can stand up shortly after being born and can weigh up to 260 pounds.", "The average life span for an elephant in the wild is from 50 to 70 years.", "Elephants eat up to 50 tons of food each year and drink up to 160 liters of water a day.", "In the last forty years alone, African elephant populations have declined by over 70% from a population of over 1.3 million elephants that roamed Africa in 1979. This is mainly due to the illegal ivory trade.", "Elephants are a trans-boundary species, which means they rely on migration and movement for their survival, rather than living in one place. The rapid construction of roads, cities, and infrastructure throughout elephant range states is having a profound impact on elephant migration patterns with drastic consequences to their survival as landscapes shrink and viable habitats are threatened."]
}


// MESSAGE INPUT
const textarea = document.querySelector('.msg-input')
const chatboxForm = document.querySelector('.msg-form')

textarea.addEventListener('input', function() {
  let line = textarea.value.split('\n').length

  if (textarea.rows < 6 || line < 6) {
    textarea.rows = line
  }

  if (textarea.rows > 1) {
    chatboxForm.style.alignItems = 'flex-end'
  } else {
    chatboxForm.style.alignItems = 'center'
  }
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.msg-container')

chatboxToggle.addEventListener('click', function() {
  chatboxMessage.classList.toggle('show')
})



// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.msg-content')
const chatboxNoMessage = document.querySelector('.no-msg')

chatboxForm.addEventListener('submit', function(e) {
  e.preventDefault()

  userMsg = textarea.value

  if (isValid(textarea.value)) {
    writeMessage()
    receiveMessage()
    setTimeout(autoReply, 1000)
  }
})



function addZero(num) {
  return num < 10 ? '0' + num : num
}

function writeMessage() {
  const today = new Date()
  let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
  chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
  chatboxForm.style.alignItems = 'center'
  textarea.rows = 1
  textarea.focus()
  textarea.value = ''
  chatboxNoMessage.style.display = 'none'
  scrollBottom()
}

function receiveMessage() {

  if (/orangutan/.test(userMsg)) {
    if (anI != 0) {
      fI = 0
      anI = 0
      getReply(anI, fI)
      return
    }
  }
  else if (/tiger/.test(userMsg)) {
    if (anI != 1) {
      fI = 0
      anI = 1
      getReply(anI, fI)
      return
    }
  }
  else if (/rhino/.test(userMsg)) {
    if (anI != 2) {
      fI = 0
      anI = 2
      getReply(anI, fI)
      return
    }
  }
  else if (/panda/.test(userMsg)) {
    if (anI != 3) {
      fI = 0
      anI = 3
      getReply(anI, fI)
      return
    }
  }
  else if (/elephant/.test(userMsg)) {
    if (anI != 4) {
      fI = 0
      anI = 4
      getReply(anI, fI)
      return
    }
  }

  if (/more/.test(userMsg) || /fact/.test(userMsg)) {
    fI += 1
    if (anI == -1) {
      botMsg = "Please choose an animal first!"
      return
    }
    getReply(anI, fI)
  } else if (/conservation/.test(userMsg) || /help/.test(userMsg) || /protect/.test(userMsg)) {
    fI = 3
    if (anI == -1) {
      botMsg = "Please choose an animal first!"
      return
    }
    getReply(anI, fI)
  }

}

function getReply(animal, fact) {
  if (fact > fax[0].length - 1) {
    botMsg = "Sorry, that's all the info we have right now!"
    return
  }
  botMsg = fax[animal][fact]
}

function autoReply() {
  const today = new Date()
  let message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
				${botMsg}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
  chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
  scrollBottom()
}

function scrollBottom() {
  chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
  let text = value.replace(/\n/g, '')
  text = text.replace(/\s/g, '')

  return text.length > 0
}