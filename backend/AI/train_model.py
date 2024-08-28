import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments

def load_dataset(train_path, val_path, tokenizer):
    train_dataset = TextDataset(
        tokenizer=tokenizer,
        file_path=train_path,
        block_size=128
    )
    val_dataset = TextDataset(
        tokenizer=tokenizer,
        file_path=val_path,
        block_size=128
    )
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False
    )
    return train_dataset, val_dataset, data_collator

def truncate_repeated_response(response, delimiter=". "):
    sentences = response.split(delimiter)
    unique_sentences = []
    for sentence in sentences:
        if sentence not in unique_sentences:
            unique_sentences.append(sentence)
    return delimiter.join(unique_sentences)

def main():
    model_name = "gpt2-medium"  # Use a larger model
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)

    # Load datasets
    train_dataset, val_dataset, data_collator = load_dataset("train.txt", "val.txt", tokenizer)
    
    # Debug: Print the first few examples from the training dataset
    print("Sample training data:", train_dataset.examples[:2])
    
    training_args = TrainingArguments(
        output_dir='./results',
        overwrite_output_dir=True,
        num_train_epochs=5,  # Increase the number of epochs
        per_device_train_batch_size=2,  # Decrease batch size if needed for larger model
        save_steps=10_000,
        save_total_limit=2,
        prediction_loss_only=True,
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        data_collator=data_collator,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
    )

    # Train the model
    trainer.train()
    model.save_pretrained('./model')
    tokenizer.save_pretrained('./model')

    # Detect available device
    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    model.to(device)

    # Example of generating an answer
    question = "Explain quicksort"
    inputs = tokenizer.encode("Question: " + question + " Answer:", return_tensors="pt").to(device)
    attention_mask = torch.ones(inputs.shape, device=device)
    
    # Debug: Print tokenized inputs
    print("Tokenized inputs:", tokenizer.convert_ids_to_tokens(inputs[0].tolist()))
    
    outputs = model.generate(inputs, attention_mask=attention_mask, max_length=200, num_return_sequences=1)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Debug: Print the raw generated answer
    print(f"Raw answer: {answer}")

    # Truncate repeated responses
    truncated_answer = truncate_repeated_response(answer)
    print(truncated_answer)

if __name__ == "__main__":
    main()